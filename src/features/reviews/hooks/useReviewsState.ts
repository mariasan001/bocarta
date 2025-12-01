'use client';

import { useMemo, useState } from 'react';
import { mockReviews } from '../fixtures/mockReviews';
import type { Review, ReviewStatus } from '../types';

type StatusFilter = 'all' | ReviewStatus;
type RatingFilter = 'all' | 5 | 4 | 3;

export function useReviewsState() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>('all');

  function setStatus(status: StatusFilter) {
    setStatusFilter(status);
  }

  function setRating(filter: RatingFilter) {
    setRatingFilter(filter);
  }

  function toggleFeatured(id: string) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isFeatured: !r.isFeatured } : r,
      ),
    );
  }

  function markReplied(id: string) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'replied' } : r,
      ),
    );
  }

  function archive(id: string) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: 'archived' } : r,
      ),
    );
  }

  function toggleReward(id: string) {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, rewardIssued: !r.rewardIssued }
          : r,
      ),
    );
  }

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;

      if (ratingFilter === 5 && r.rating !== 5) return false;
      if (ratingFilter === 4 && r.rating < 4) return false;
      if (ratingFilter === 3 && r.rating < 3) return false;

      return true;
    });
  }, [reviews, statusFilter, ratingFilter]);

  const avgRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  const todayRewards = reviews.filter(
    (r) => r.rewardIssued && r.status !== 'archived',
  ).length;

  return {
    reviews,
    filteredReviews,
    statusFilter,
    ratingFilter,
    setStatus,
    setRating,
    toggleFeatured,
    markReplied,
    archive,
    toggleReward,
    avgRating,
    todayRewards,
  };
}
