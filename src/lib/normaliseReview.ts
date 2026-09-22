/**
 * normaliseReview — deep adapter for the Review schema inconsistency.
 *
 * Interface (small):
 *   normaliseReview(raw: Review): NormalisedReview
 *
 * Implementation (hidden):
 *   - Resolves username | userName | userEmail fallback chain → displayName
 *   - Resolves userPhoto | userImage → displayPhoto
 *   - Formats reviewTime (number | string | undefined) → formattedDate string
 *
 * Use this adapter at every site that renders a Review card.
 * One test for this function covers all render sites.
 */

import { Review } from "@/types";

export interface NormalisedReview extends Review {
  displayName: string;
  displayPhoto: string;
  formattedDate: string;
}

const BLANK_AVATAR = "https://i.ibb.co/5x6DN2n/blank-dp.png";

export function normaliseReview(r: Review): NormalisedReview {
  const displayName =
    r.username ||
    r.userName ||
    (r.userEmail ? r.userEmail.split("@")[0] : "Verified Resident");

  const displayPhoto = r.userPhoto || r.userImage || BLANK_AVATAR;

  const formattedDate = r.reviewTime
    ? new Date(
        typeof r.reviewTime === "number" || !isNaN(Number(r.reviewTime))
          ? Number(r.reviewTime)
          : r.reviewTime
      ).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "Verified Review";

  return { ...r, displayName, displayPhoto, formattedDate };
}
