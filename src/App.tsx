import "./App.css";
import { BillingForm } from "./features/billing/components/billing-form";

function App() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-semibold">Start your Pro plan</h1>
        <p className="text-muted-foreground">
          Please complete the form below, including your billing information and
          payment method details.
        </p>
      </div>
      <BillingForm />
    </div>
  );
}

export default App;
