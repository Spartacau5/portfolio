import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, subject, phone, email, extra, recordId, sessionId } = body;

        const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
        const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
        const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Leads';

        if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
            console.error('Missing Airtable configuration');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Build fields object with only provided values
        const fields: Record<string, string> = {};
        if (name) fields.Name = name;
        if (subject) fields.Topic = subject;
        if (phone) fields.Phone = phone;
        if (email) fields.Email = email;
        if (extra) fields.Extra = extra;
        if (sessionId) fields.SessionID = sessionId;

        // If recordId exists, update the existing record
        if (recordId) {
            const response = await fetch(
                `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}/${recordId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fields })
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Airtable update error:', errorData);
                return NextResponse.json(
                    { error: 'Failed to update data' },
                    { status: 500 }
                );
            }

            const data = await response.json();
            return NextResponse.json({ success: true, recordId: data.id });
        }

        // Create new record
        const response = await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fields })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Airtable create error:', errorData);
            return NextResponse.json(
                { error: 'Failed to save data' },
                { status: 500 }
            );
        }

        const data = await response.json();
        return NextResponse.json({ success: true, recordId: data.id });

    } catch (error) {
        console.error('Submit lead error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
