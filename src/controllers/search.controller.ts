import { Request, Response } from "express";
import { generateEmbeddings } from "./embedding.controller";
import { pc } from "../db";
import { openai } from "./embedding.controller";

export const SearchQueryResult = async ({ query }: { query: string }) => {
  try {
    const embeddings = await generateEmbeddings({ text: query });

    const pineconeIndex = pc.Index("brainly");

    const searchResults = await pineconeIndex.query({
      vector: embeddings,
      includeMetadata: true,
      topK: 5,
    });

    return searchResults.matches;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const QueryOpenAI = async ({
  context,
  query,
}: {
  context?: string;
  query: string;
}) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: context || "You are a helpful assistant.",
        },
        {
          role: "user",
          content: query,
        },
      ],
      max_tokens: 200,
      temperature: 1,
    });

    const description = response.choices[0]?.message?.content?.trim();

    if (!description) {
      throw new Error("Please Query Again");
    }

    return description;
  } catch (error) {
    throw new Error("Internal Server Error");
  }
};

export const QueryResult = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req.body;

    // Check if the query is provided
    if (!query) {
      res.status(404).json({
        message: "Query is required",
      });

      return;
    }

    const RawContext = await SearchQueryResult({ query });

    const context = RawContext.map((result, index) =>
      result.metadata
        ? `${index + 1}. Title: ${result.metadata.title}\n   Link: ${
            result.metadata.link
          }\n   Content: ${result.metadata.content}`
        : ""
    )
      .filter(Boolean)
      .join("\n\n");

    let description;

    if (context) {
      description = await QueryOpenAI({ context, query });
    } else {
      description = await QueryOpenAI({ query });
    }

    res.status(200).json({
      description,
    });
  } catch (error) {
    console.error("Error processing query: ", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
