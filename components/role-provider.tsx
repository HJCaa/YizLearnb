"use client"

import { createContext, useContext, useState } from "react"

export type Role = "student" | "teacher"

type RoleContextValue = {
  role: Role
  setRole: (role: Role) => void
}

const RoleContext = createContext<RoleContextValue>({
  role: "student",
  setRole: () => {},
})

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>("student")
  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>
}

export function useRole() {
  return useContext(RoleContext)
}
