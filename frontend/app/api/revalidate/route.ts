import { NextResponse } from "next/server"
import { revalidatePath, revalidateTag } from "next/cache"

// Called by the admin dashboard after adding/deleting a blog
// to instantly clear the cache on public blog pages
export async function POST() {
  try {
    revalidatePath("/blog")           // blog list page
    revalidatePath("/blog/[slug]", "page")  // all blog detail pages
    return NextResponse.json({ revalidated: true })
  } catch (err) {
    return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 })
  }
}
