import { db } from "@/db/server";
import { Post } from "@/types";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const snapshot = await db.collection("posts").get();

    if (snapshot.empty) {
      return NextResponse.json(
        { posts: [], message: "No posts found" },
        { status: 200 }
      );
    }

    const posts: Post[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Post, "id">),
    }));

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }
};
