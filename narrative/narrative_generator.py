#
#   Crafted On Sun Jan 11 2026
#   From his finger tips, through his IDE to your deployment environment at full throttle with no bugs, loss of data,
#   fluctuations, signal interference, or doubt—it can only be
#   the legendary coding wizard, Martin Mbithi (martin@devlan.co.ke, www.martmbithi.github.io)
#   
#   www.devlan.co.ke
#   hello@devlan.co.ke
#
#
#   The Devlan Solutions LTD Super Duper User License Agreement
#   Copyright (c) 2022 Devlan Solutions LTD
#
#
#   1. LICENSE TO BE AWESOME
#   Congrats, you lucky human! Devlan Solutions LTD hereby bestows upon you the magical,
#   revocable, personal, non-exclusive, and totally non-transferable right to install this epic system
#   on not one, but TWO separate computers for your personal, non-commercial shenanigans.
#   Unless, of course, you've leveled up with a commercial license from Devlan Solutions LTD.
#   Sharing this software with others or letting them even peek at it? Nope, that's a big no-no.
#   And don't even think about putting this on a network or letting a crowd join the fun unless you
#   first scored a multi-user license from us. Sharing is caring, but rules are rules!
#
#   2. COPYRIGHT POWER-UP
#   This Software is the prized possession of Devlan Solutions LTD and is shielded by copyright law
#   and the forces of international copyright treaties. You better not try to hide or mess with
#   any of our awesome proprietary notices, labels, or marks. Respect the swag!
#
#
#   3. RESTRICTIONS, NO CHEAT CODES ALLOWED
#   You may not, and you shall not let anyone else:
#   (a) reverse engineer, decompile, decode, decrypt, disassemble, or do any sneaky stuff to
#   figure out the source code of this software;
#   (b) modify, remix, distribute, or create your own funky version of this masterpiece;
#   (c) copy (except for that one precious backup), distribute, show off in public, transmit, sell, rent,
#   lease, or otherwise exploit the Software like it's your own.
#
#
#   4. THE ENDGAME
#   This License lasts until one of us says 'Game Over'. You can call it quits anytime by
#   destroying the Software and all the copies you made (no hiding them under your bed).
#   If you break any of these sacred rules, this License self-destructs, and you must obliterate
#   every copy of the Software, no questions asked.
#
#
#   5. NO GUARANTEES, JUST PIXELS
#   DEVLAN SOLUTIONS LTD doesn’t guarantee this Software is flawless—it might have a few
#   quirks, but who doesn’t? DEVLAN SOLUTIONS LTD washes its hands of any other warranties,
#   implied or otherwise. That means no promises of perfect performance, marketability, or
#   non-infringement. Some places have different rules, so you might have extra rights, but don’t
#   count on us for backup if things go sideways. Use at your own risk, brave adventurer!
#
#
#   6. SEVERABILITY—KEEP THE GOOD STUFF
#   If any part of this License gets tossed out by a judge, don’t worry—the rest of the agreement
#   still stands like a boss. Just because one piece fails doesn’t mean the whole thing crumbles.
#
#
#   7. NO DAMAGE, NO DRAMA
#   Under no circumstances will Devlan Solutions LTD or its squad be held responsible for any wild,
#   indirect, or accidental chaos that might come from using this software—even if we warned you!
#   And if you ever think you’ve got a claim, the most you’re getting out of us is the license fee you
#   paid—if any. No drama, no big payouts, just pixels and code.
#
#

from narrative_llm.openai_client import OpenAIClient
from narrative.batching import chunk_artifacts, build_batch_prompt
from tqdm import tqdm
import time


class NarrativeGenerator:
    def __init__(self):
        self.llm_client = OpenAIClient()

    def GenerateBatched(self, triaged, batch_size=25):
        batches = list(chunk_artifacts(triaged, batch_size))
        narratives = []

        with tqdm(
            total=len(batches),
            desc="Generating narrative batches",
            unit="batch"
        ) as pbar:
            for idx, batch in enumerate(batches, start=1):
                prompt = build_batch_prompt(batch, idx, len(batches))
                narratives.append(self.llm_client.generate(prompt))
                pbar.update(1)
                time.sleep(1.5)  # rate-limit safety

        return narratives

    def Synthesize(self, batch_narratives):
        print("[*] Synthesizing final narrative...")
        combined = "\n\n".join(batch_narratives)

        synthesis_prompt = f"""
You are a senior digital forensic analyst.

Combine the following sectioned forensic summaries into a single cohesive narrative.
Do NOT speculate.
Do NOT attribute.
Maintain professional DFIR tone.

Summaries:
{combined}
"""
        return self.llm_client.generate(synthesis_prompt)
