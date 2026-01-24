import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export default function UiPage() {
  return (
    <main className="gb-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">Glambox UI Kit</h1>
          <p className="mt-2 text-muted">
            Vibrant accents, crisp surfaces, and reusable components.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="gb-glass">
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="text-text">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="gb-glass">
            <CardHeader>
              <CardTitle>Cards</CardTitle>
            </CardHeader>
            <CardContent className="text-text">
              <p>
                This is a card using global tokens (surface, border, shadows) with a glass effect.
              </p>
              <div className="mt-4">
                <Button variant="secondary">Action</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
