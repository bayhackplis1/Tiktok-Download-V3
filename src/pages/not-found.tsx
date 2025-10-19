import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary matrix-text">404</h1>
        <p className="text-xl text-muted-foreground">Page not found</p>
        <Link href="/">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
