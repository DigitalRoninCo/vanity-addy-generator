"""Utility for generating Solana vanity wallet addresses.

This module exposes ``generate_vanity_wallet`` which loops until a randomly
created :class:`solders.keypair.Keypair` matches the provided search
criteria.  The resulting public key and the secret key (encoded as base58)
are returned for further use.
"""

from __future__ import annotations

import base58
from solders.keypair import Keypair


def _normalize(value: str | None) -> str:
    """Return a string value or an empty string if ``None``."""
    return value or ""


def generate_vanity_wallet(
    pattern: str = "",
    starts_with: str = "",
    ends_with: str = "",
    case_sensitive: bool = True,
) -> tuple[str, str, str]:
    """Generate a Solana wallet matching the requested pattern.

    Parameters
    ----------
    pattern:
        Substring that must occur somewhere in the public key.
    starts_with:
        Prefix the public key must begin with.
    ends_with:
        Suffix the public key must end with.
    case_sensitive:
        If ``False`` comparisons ignore character casing.

    Returns
    -------
    tuple[str, str, str]
        ``(public_key, secret_key, matched_pattern)`` where ``secret_key`` is
        the base58 encoded secret key and ``matched_pattern`` echoes the first
        non-empty search term.
    """

    pattern = _normalize(pattern)
    starts_with = _normalize(starts_with)
    ends_with = _normalize(ends_with)

    if not case_sensitive:
        pattern = pattern.lower()
        starts_with = starts_with.lower()
        ends_with = ends_with.lower()

    while True:
        kp = Keypair()
        pub_str = str(kp.pubkey())
        comparison = pub_str if case_sensitive else pub_str.lower()

        if pattern and pattern not in comparison:
            continue
        if starts_with and not comparison.startswith(starts_with):
            continue
        if ends_with and not comparison.endswith(ends_with):
            continue

        secret_key = base58.b58encode(bytes(kp)).decode()
        matched = pattern or starts_with or ends_with
        return pub_str, secret_key, matched
