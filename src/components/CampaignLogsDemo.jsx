import React, { useState } from 'react'
import { useCampaignLogs } from '../hooks/useCampaignLogs'

export default function CampaignLogsDemo({ campaignId }) {
  const [page, setPage] = useState(1)
  const per_page = 50
  const { data, isLoading, error } = useCampaignLogs(campaignId, page, per_page)

  if (isLoading) return <div>Loading logs...</div>
  if (error) return <div>Error loading logs: {error.message}</div>

  const logs = data?.logs || []
  const summary = data?.summary || {}

  return (
    <div>
      <h3>Campaign Logs (Page {page})</h3>
      <div>Summary: Total {summary.total} • Sent {summary.sent} • Delivered {summary.delivered}</div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Recipient</th>
            <th>Email</th>
            <th>Status</th>
            <th>Sent At</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((l) => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.recipient_name || l.contactName}</td>
              <td>{l.recipient_email || l.email}</td>
              <td>{l.status}</td>
              <td>{l.sent_at || l.sentAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  )
}
