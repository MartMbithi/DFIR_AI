
from collections import defaultdict

ATTACK_CHANNELS = {
    "web": ["http","https","waf","sql","sqli","lfi","xss","path traversal"],
    "authentication": ["login failed","authentication","password","ssh","rdp","vpn","brute force","mfa"],
    "network": ["port scan","syn","icmp","ldap","smb","dns","smtp"],
    "endpoint": ["process","binary","execution","service","registry","powershell","cmd.exe"],
    "cloud": ["iam","assume role","token","api","cloudtrail","azure","gcp"]
}

def classify_attack_channels(triaged):
    channels = {k: False for k in ATTACK_CHANNELS}
    for a in triaged:
        s = a.get("content_summary","").lower()
        for ch, keys in ATTACK_CHANNELS.items():
            if any(k in s for k in keys):
                channels[ch] = True
    return channels

def classify_channel_evidence(triaged):
    evidence = defaultdict(set)
    for a in triaged:
        s = a.get("content_summary","").lower()
        for ch, keys in ATTACK_CHANNELS.items():
            for k in keys:
                if k in s:
                    evidence[ch].add(k)
    return {k: sorted(v) for k,v in evidence.items()}
