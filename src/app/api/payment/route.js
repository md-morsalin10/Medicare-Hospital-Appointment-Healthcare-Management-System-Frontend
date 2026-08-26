import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSeason } from '@/lib/core/session';

export async function POST(request) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');
        const user = await getUserSeason();

        const formData = await request.formData();

        // Extracting Doctor Info
        const doctorId = formData.get("doctorId");
        const doctorName = formData.get("doctorName");
        const doctorEmail = formData.get("doctorEmail");
        const doctorFee = formData.get("doctorFee");

        // Extracting Patient Info
        const patientId = formData.get("patientId") || user?._id || user?.id;
        const patientName = formData.get("patientName") || user?.name;
        const patientEmail = formData.get("patientEmail") || user?.email;
        const patientImage = formData.get("patientImage") || user?.image;

        // Extracting Booking Details
        const appointmentDate = formData.get("appointmentDate");
        const appointmentTime = formData.get("appointmentTime");
        const symptoms = formData.get("symptoms");

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer_email: patientEmail,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        unit_amount: Number(doctorFee) * 100,
                        product_data: {
                            name: `Appointment with Dr. ${doctorName}`,
                            description: `Date: ${appointmentDate} | Time: ${appointmentTime}`,
                        }
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                // Doctor Details
                doctorId,
                doctorName,
                doctorEmail,
                doctorFee: String(doctorFee), 

                // Patient Details
                patientId,
                patientName,
                patientEmail,
                patientImage,

                appointmentDate,
                appointmentTime,
                symptoms: symptoms || "N/A",
                bookingStatus: "Paid"
            },
            mode: 'payment',
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/doctors/${doctorId}`,
        });

        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        );
    }
}