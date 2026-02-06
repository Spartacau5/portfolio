import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, role } = body;

        // Validate required fields
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_PASSWORD_REQUESTS_TABLE || 'PasswordRequests';

        if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
            console.error('Missing Airtable configuration');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Create the record in Airtable
        const response = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: {
                        Email: email,
                        ...(role && { Role: role }),
                        RequestedAt: new Date().toISOString(),
                        Status: 'Pending'
                    }
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Airtable create error:', errorData);
            return NextResponse.json(
                { error: 'Failed to submit request' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('Request password error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
