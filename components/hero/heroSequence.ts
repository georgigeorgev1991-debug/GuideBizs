"use client";

let heroSequencePlayed = false;

export function heroSequenceHasPlayed() {
  return heroSequencePlayed;
}

export function markHeroSequencePlayed() {
  heroSequencePlayed = true;
}
