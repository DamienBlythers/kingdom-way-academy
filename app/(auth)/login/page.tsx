"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleGithubSignIn = async () => {
    try {
      setIsGithubLoading(true);
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error("GitHub sign in error:", error);
      toast.error("Failed to sign in with GitHub");
      setIsGithubLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setIsLoading(true);
      
      if (isSignUp) {
        // Sign up
        const result = await authClient.signUp.email({
          email,
          password,
          name: email.split("@")[0],
        });
        
        if (result.error) {
          toast.error(result.error.message || "Failed to create account");
          return;
        }
        
        // Send welcome email
        try {
          await fetch("/api/auth/send-welcome-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, name: email.split("@")[0] }),
          });
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          // Don't block signup if email fails
        }
        
        toast.success("Account created! You can now sign in.");
        setIsSignUp(false);
        setPassword("");
      } else {
        // Sign in
        const result = await authClient.signIn.email({
          email,
          password,
        });
        
        if (result.error) {
          toast.error(result.error.message || "Invalid email or password");
          return;
        }
        
        toast.success("Signed in successfully!");
        
        // Force redirect after successful sign in
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      }
    } catch (error: any) {
      console.error("Email auth error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          {isSignUp ? "Create an account" : "Welcome back!"}
        </CardTitle>
        <CardDescription>
          {isSignUp 
            ? "Sign up to get started with Kingdom Way Academy" 
            : "Log in with your GitHub or email account"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={handleGithubSignIn}
          disabled={isGithubLoading || isLoading}
        >
          <Github className="size-4" />
          {isGithubLoading ? "Connecting..." : "Sign in with GitHub"}
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>

        <form onSubmit={handleEmailAuth} className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {!isSignUp && (
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-blue-600 hover:underline"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              minLength={6}
              autoComplete={isSignUp ? "new-password" : "current-password"}
            />
            {isSignUp && (
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters
              </p>
            )}
          </div>

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading 
              ? (isSignUp ? "Creating account..." : "Signing in...") 
              : (isSignUp ? "Sign Up" : "Sign In")
            }
          </Button>

          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setPassword("");
            }}
            disabled={isLoading}
          >
            {isSignUp 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"
            }
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

