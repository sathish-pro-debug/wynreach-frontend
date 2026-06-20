import { useQuery } from '@tanstack/react-query'

async function fetchCampaignLogs({ queryKey }) {
  const [_key, { id, page = 1, per_page = 50 }] = queryKey
  const res = await fetch(`/api/campaigns/${id}/logs?page=${page}&per_page=${per_page}`)
  if (!res.ok) throw new Error('Failed to fetch campaign logs')
  return res.json()
}

export function useCampaignLogs(id, page = 1, per_page = 50, options = {}) {
  return useQuery(['campaignLogs', { id, page, per_page }], fetchCampaignLogs, {
    staleTime: 30_000,
    cacheTime: 5 * 60_000,
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  })
}
