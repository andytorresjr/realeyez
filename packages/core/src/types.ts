export type PostType = 'video' | 'text';

export interface CandidatePost {
  id: string;
  authorId: string;
  createdAtMs: number;
  hashtags: string[];
  likeCount: number;
  commentCount: number;
  avgWatchRatio: number;
  provenanceConfidence: number;
}

export interface ViewerSignals {
  viewerId: string;
  followedAuthorIds: Set<string>;
  likedHashtags: Set<string>;
  blockedAuthorIds: Set<string>;
  nowMs: number;
}
