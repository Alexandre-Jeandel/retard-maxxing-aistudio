// YouTube videos shown on the landing page.
// Mixed creators on purpose: dilutes any single-creator copyright/takedown risk
// and reads as a curated cultural snapshot, not a fan site.
//
// Coverage rationale (one video per audience cluster from the research):
//   - All-In Podcast    -> cluster B (VC / founder mainstream)
//   - Elisha Long       -> cluster C (philosophy founder, the canonical clip)
//   - Smith Rees        -> cluster B (business / "cheat code to get rich" angle)
//   - Tomas Mones-Cazon -> cluster C overlap (religious / "blessed warriors")
//   - Zoorp             -> cluster E (skeptical outsider take, gives balance)
//   - Joey Saves        -> cluster E (newcomer explainer)

export interface Video {
  id: string;
  title: string;
  creator: string;
}

export const VIDEOS: Video[] = [
  {
    id: 'rIQ3t1ixUIE',
    title: 'be retarded with women, friends, and jobs',
    creator: 'elisha long',
  },
  {
    id: 'kV65-IJ1DE0',
    title: 'retardmaxxing: the next great modern philosophy?',
    creator: 'All-In Podcast',
  },
  {
    id: 'LJvCwdNtWZY',
    title: '"retardmaxxing" is the cheat code to getting rich',
    creator: 'Smith Rees Business',
  },
  {
    id: 'AVB_aIXMEgE',
    title: 'god blesses his most retarded soldiers',
    creator: 'Tomas Mones-Cazon',
  },
  {
    id: 'dedB7tf9j5M',
    title: 'yes, unfortunately retardmaxxing is a thing now...',
    creator: 'Zoorp',
  },
  {
    id: 'EnlgtlXbArQ',
    title: 'what is retard maxing?',
    creator: 'Joey Saves',
  },
];
