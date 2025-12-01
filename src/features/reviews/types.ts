export type ReviewStatus = 'new' | 'replied' | 'archived' | 'flagged';
export type ReviewSource = 'qrMenu' | 'google' | 'manual';

export type RewardType = 'dessert' | 'drink' | 'discount';

export type Review = {
  id: string;
  rating: number; // 1–5
  comment: string;
  createdAt: string; // ISO string
  customerName?: string;
  visitCount?: number;
  source: ReviewSource;
  status: ReviewStatus;
  isFeatured?: boolean;     // se usa como testimonio
  rewardIssued?: boolean;   // se le dio recompensa
  rewardType?: RewardType;
};
