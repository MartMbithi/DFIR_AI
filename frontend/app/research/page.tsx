/*
 *   Crafted On Fri Jan 30 2026
 *   From his finger tips, through his IDE to your deployment environment at full throttle with no bugs, loss of data,
 *   fluctuations, signal interference, or doubt—it can only be
 *   the legendary coding wizard, Martin Mbithi (martin@devlan.co.ke, www.martmbithi.github.io)
 *   
 *   www.devlan.co.ke
 *   hello@devlan.co.ke
 *
 *
 *   The Devlan Solutions LTD Super Duper User License Agreement
 *   Copyright (c) 2022 Devlan Solutions LTD
 *
 *
 *   1. LICENSE TO BE AWESOME
 *   Congrats, you lucky human! Devlan Solutions LTD hereby bestows upon you the magical,
 *   revocable, personal, non-exclusive, and totally non-transferable right to install this epic system
 *   on not one, but TWO separate computers for your personal, non-commercial shenanigans.
 *   Unless, of course, you've leveled up with a commercial license from Devlan Solutions LTD.
 *   Sharing this software with others or letting them even peek at it? Nope, that's a big no-no.
 *   And don't even think about putting this on a network or letting a crowd join the fun unless you
 *   first scored a multi-user license from us. Sharing is caring, but rules are rules!
 *
 *   2. COPYRIGHT POWER-UP
 *   This Software is the prized possession of Devlan Solutions LTD and is shielded by copyright law
 *   and the forces of international copyright treaties. You better not try to hide or mess with
 *   any of our awesome proprietary notices, labels, or marks. Respect the swag!
 *
 *
 *   3. RESTRICTIONS, NO CHEAT CODES ALLOWED
 *   You may not, and you shall not let anyone else:
 *   (a) reverse engineer, decompile, decode, decrypt, disassemble, or do any sneaky stuff to
 *   figure out the source code of this software;
 *   (b) modify, remix, distribute, or create your own funky version of this masterpiece;
 *   (c) copy (except for that one precious backup), distribute, show off in public, transmit, sell, rent,
 *   lease, or otherwise exploit the Software like it's your own.
 *
 *
 *   4. THE ENDGAME
 *   This License lasts until one of us says 'Game Over'. You can call it quits anytime by
 *   destroying the Software and all the copies you made (no hiding them under your bed).
 *   If you break any of these sacred rules, this License self-destructs, and you must obliterate
 *   every copy of the Software, no questions asked.
 *
 *
 *   5. NO GUARANTEES, JUST PIXELS
 *   DEVLAN SOLUTIONS LTD doesn’t guarantee this Software is flawless—it might have a few
 *   quirks, but who doesn’t? DEVLAN SOLUTIONS LTD washes its hands of any other warranties,
 *   implied or otherwise. That means no promises of perfect performance, marketability, or
 *   non-infringement. Some places have different rules, so you might have extra rights, but don’t
 *   count on us for backup if things go sideways. Use at your own risk, brave adventurer!
 *
 *
 *   6. SEVERABILITY—KEEP THE GOOD STUFF
 *   If any part of this License gets tossed out by a judge, don’t worry—the rest of the agreement
 *   still stands like a boss. Just because one piece fails doesn’t mean the whole thing crumbles.
 *
 *
 *   7. NO DAMAGE, NO DRAMA
 *   Under no circumstances will Devlan Solutions LTD or its squad be held responsible for any wild,
 *   indirect, or accidental chaos that might come from using this software—even if we warned you!
 *   And if you ever think you’ve got a claim, the most you’re getting out of us is the license fee you
 *   paid—if any. No drama, no big payouts, just pixels and code.
 *
 */
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Research | DFIR-AI',
    description:
        'Technical research, methodologies, and insights on digital forensics and incident response.'
};

export default function Research() {
    return (
        <>
            <Nav />

            <main className="pt-16 bg-background text-textPrimary">
                <section className="container px-4 md:px-8 py-24 max-w-5xl">
                    <h1 className="text-4xl font-extrabold mb-8">
                        Research & Insights
                    </h1>

                    <p className="text-lg text-textMuted mb-12">
                        DFIR-AI research focuses on advancing digital forensics and incident
                        response through applied machine learning, structured investigations,
                        and evidence-centric workflows.
                    </p>

                    <div className="space-y-10">

                        <ResearchItem
                            title="AI-Assisted Timeline Reconstruction"
                            desc="Techniques for correlating logs, endpoints, and artifacts into defensible investigation timelines."
                        />

                        <ResearchItem
                            title="Forensic Integrity in Automated Systems"
                            desc="Design patterns for maintaining chain-of-custody while introducing automation and AI."
                        />

                        <ResearchItem
                            title="Incident Response in Regulated Environments"
                            desc="Balancing speed, rigor, and compliance in enterprise and government investigations."
                        />

                        <ResearchItem
                            title="Operationalizing DFIR at Scale"
                            desc="Lessons from large-scale investigations and multi-tenant forensic platforms."
                        />

                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

function ResearchItem({ title, desc }: { title: string; desc: string }) {
    return (
        <div className="bg-card rounded-xl p-6 border border-black/10">
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-textMuted">{desc}</p>
        </div>
    );
}
