'use client';

/**
 * Visual list of the product requirements gathered with the PM for the alpha.
 * A single clean card: each requirement is a row with a priority pill
 * ([Must] solid / [Nice] muted) and an optional clarifying detail beneath it.
 */

type Priority = 'must' | 'nice';
type Req = { p: Priority; text: string; note?: string };

const PRODUCT: Req[] = [
    { p: 'must', text: 'A user has a new search box that supports natural language search' },
    { p: 'must', text: 'Provide basic guidance on the types of queries a user can perform' },
    { p: 'must', text: 'A user can easily edit existing queries' },
    { p: 'must', text: 'A user can see the last 3 queries while in the same session and tab' },
    {
        p: 'must',
        text: 'A user is notified if their query will likely return too many results',
        note: 'Under five words → prompt the user to add more search terms',
    },
    {
        p: 'must',
        text: 'Error handling for when the model times out during high-load times',
        note: 'Over 20 seconds → time-out with an error to retry',
    },
    { p: 'must', text: "Track the user's full query and the parsed results" },
    { p: 'must', text: 'A user can only enter 1024 characters' },
    { p: 'nice', text: 'A user can enter a search and see the results on the same page' },
];

export function ZiRequirements() {
    return (
        <div className="zi-reqs">
            <div className="zi-reqs-panel">
                <header className="zi-reqs-panel-head">
                    <span className="zi-reqs-panel-title">Product Requirements</span>
                    <span className="zi-reqs-panel-sub">{PRODUCT.length} requirements</span>
                </header>
                <ul className="zi-reqs-list">
                    {PRODUCT.map((r, i) => (
                        <li key={i} className="zi-req">
                            <span className={`zi-req-pill zi-req-pill--${r.p}`}>
                                {r.p === 'must' ? 'Must' : 'Nice'}
                            </span>
                            <div className="zi-req-body">
                                <span className="zi-req-text">{r.text}</span>
                                {r.note && <span className="zi-req-note">{r.note}</span>}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
