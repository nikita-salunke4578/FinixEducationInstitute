"use client"

import { Button } from "@/components/ui/button"
import { logout } from "./actions"

export function LogoutButton() {
  return (
    <Button variant="outline" onClick={() => logout()}>
      Logout
    </Button>
  )
}
