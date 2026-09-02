import { redirect } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Calendar, Clock, User, FileText, ArrowRight } from 'lucide-react';
import { stripe } from '@/lib/stripe';
import { createBookingData } from '@/lib/action/doctorBooking';


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  // Retrieve Stripe Session with metadata
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  const { status, metadata, customer_details } = session;
  const customerEmail = customer_details?.email || metadata?.patientEmail;

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {

    await createBookingData({
      ...metadata,
      stripeSessionId: session_id,
      paymentStatus: status,
      customerEmail: customerEmail,
    })
    
    // console.log('=== Stripe Session Metadata ===', metadata);

    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          {/* Header Banner */}
          <div className="bg-emerald-600 p-8 text-center text-white relative">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Payment Successful!</h1>
            <p className="text-emerald-100 text-sm mt-1">Your appointment has been confirmed</p>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Confirmation Alert */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 text-emerald-800 text-xs sm:text-sm">
              A confirmation receipt and details have been recorded for <span className="font-bold">{customerEmail}</span>.
            </div>

            {/* Appointment Summary Card */}
            {metadata && (
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Appointment Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {/* Doctor Info */}
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Doctor</p>
                      <p className="font-semibold text-slate-800">{metadata.doctorName || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Date</p>
                      <p className="font-semibold text-slate-800">{metadata.appointmentDate || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Time Slot</p>
                      <p className="font-semibold text-slate-800">{metadata.appointmentTime || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500">Patient</p>
                      <p className="font-semibold text-slate-800">{metadata.patientName || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Symptoms Presentation */}
                {metadata.symptoms && metadata.symptoms !== 'N/A' && (
                  <div className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                    <span className="font-semibold text-slate-700">Symptoms:</span> {metadata.symptoms}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href="/"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-center transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
              >
                Go to Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Support Note */}
            <p className="text-center text-xs text-slate-400">
              Need assistance? Contact us at{' '}
              <a href="mailto:support@example.com" className="text-emerald-600 underline font-medium">
                support@example.com
              </a>
            </p>

          </div>
        </div>
      </div>
    );
  }

  return null;
}