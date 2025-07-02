def generate_vanity_wallet(pattern="", starts_with="", ends_with="", case_sensitive=True):
    from solders.keypair import Keypair
    import base58, time

    start_time = time.time()
    while True:
        kp = Keypair()
        pubkey = str(kp.pubkey())

        if starts_with and not pubkey.startswith(starts_with):
            continue
        if ends_with and not pubkey.endswith(ends_with):
            continue
        if pattern and pattern not in pubkey:
            continue

        secret_key = base58.b58encode(bytes(kp)).decode()
        match = pattern or starts_with or ends_with
        return pubkey, secret_key, match
