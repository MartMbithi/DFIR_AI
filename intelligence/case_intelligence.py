
from intelligence.attack_channel_classifier import classify_attack_channels, classify_channel_evidence
from intelligence.behavioral_fingerprinting import behavioral_fingerprint

def generate_case_intelligence(case_id, triaged):
    return {
        "case_id": case_id,
        "attack_channels": classify_attack_channels(triaged),
        "channel_evidence": classify_channel_evidence(triaged),
        "behavioral_fingerprint": behavioral_fingerprint(triaged)
    }
