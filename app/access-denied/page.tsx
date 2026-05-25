export default function AccessDeniedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Access Denied</h1>

        <p className="text-muted-foreground">
          You are not authorized to access this application.
        </p>
      </div>
    </div>
  );
}