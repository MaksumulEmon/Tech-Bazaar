// import { stripe } from '@/lib/stripe'
// import { redirect } from 'next/navigation'



// export default async function Success({ searchParams }) {
//     const { session_id } = await searchParams

//     if (!session_id)
//         throw new Error('Please provide a valid session_id (`cs_test_...`)')

//     const {
//         status,
//         customer_details: { email: customerEmail }
//     } = await stripe.checkout.sessions.retrieve(session_id, {
//         expand: ['line_items', 'payment_intent']
//     })

//     if (status === 'open') {
//         return redirect('/')
//     }

//     if (status === 'complete') {
//         return (
//             <section id="success">
//                 <p>
//                     We appreciate your business! A confirmation email will be sent to{' '}
//                     {customerEmail}. If you have any questions, please email{' '}
//                     <a href="mailto:orders@example.com">orders@example.com</a>.
//                 </p>
//             </section>
//         )
//     }
// }


import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error("Please provide a valid session_id");
    }

    const {
        status,
        customer_details,
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ["line_items"],
    });

    if (status === "open") {
        redirect("/");
    }

    if (status === "complete") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-default-100 p-6">
                <div className="w-full max-w-xl rounded-3xl border bg-background shadow-xl p-8 text-center">

                    <div className="flex justify-center">
                        <div className="rounded-full bg-green-100 p-4">
                            <CheckCircle className="h-16 w-16 text-green-600" />
                        </div>
                    </div>

                    <h1 className="mt-6 text-3xl font-bold">
                        Payment Successful 🎉
                    </h1>

                    <p className="mt-3 text-default-500">
                        Thank you for subscribing. Your payment has been
                        processed successfully and your account is now active.
                    </p>

                    <div className="mt-6 rounded-2xl bg-default-100 p-4">
                        <p className="text-sm text-default-500">
                            Confirmation Email
                        </p>

                        <p className="mt-1 font-medium">
                            {customer_details?.email}
                        </p>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/dashboard"
                            className="rounded-xl bg-primary px-6 py-3 text-white font-medium hover:opacity-90 transition"
                        >
                            Go to Dashboard
                        </Link>

                        <Link
                            href="/"
                            className="rounded-xl border px-6 py-3 font-medium hover:bg-default-100 transition"
                        >
                            Back to Home
                        </Link>
                    </div>

                    <p className="mt-6 text-xs text-default-400">
                        Need help? Contact support anytime.
                    </p>
                </div>
            </div>
        );
    }

    return null;
}