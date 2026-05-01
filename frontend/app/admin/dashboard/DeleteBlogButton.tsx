"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function DeleteBlogButton({ id }: { id: number | string }) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this blog?")) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/blogs?id=${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        router.refresh()
      } else {
        alert("Failed to delete blog.")
      }
    } catch (error) {
      console.error(error)
      alert("An error occurred.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete} 
      disabled={isDeleting}
      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
      aria-label="Delete blog"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
