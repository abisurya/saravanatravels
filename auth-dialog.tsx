"use client"

import { Button } from "@/components/ui/button"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import LoginForm from "./login-form"
import SignupForm from "./signup-form"

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isLogin ? "Login to Saravana Travels" : "Sign Up for Saravana Travels"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="text-center text-sm mt-4">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Button variant="link" onClick={() => setIsLogin(false)} className="p-0 h-auto text-blue-600">
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Button variant="link" onClick={() => setIsLogin(true)} className="p-0 h-auto text-blue-600">
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
