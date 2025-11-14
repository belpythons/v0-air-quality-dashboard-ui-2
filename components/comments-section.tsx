'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

interface Comment {
  id: string
  author: string
  text: string
  date: string
  replies?: Comment[]
}

export function CommentsSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: 'John Doe',
      text: 'Very informative article about the current air quality situation.',
      date: '2025-11-14',
      replies: [
        {
          id: '1-1',
          author: 'Jane Smith',
          text: 'I agree! This data helps me plan my outdoor activities better.',
          date: '2025-11-14',
        },
      ],
    },
    {
      id: '2',
      author: 'Environmental Enthusiast',
      text: 'Great analysis. Hope to see more cities implementing stricter emission controls.',
      date: '2025-11-13',
      replies: [],
    },
  ])

  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: String(comments.length + 1),
        author: 'Anonymous User',
        text: newComment,
        date: new Date().toISOString().split('T')[0],
        replies: [],
      }
      setComments([comment, ...comments])
      setNewComment('')
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>

      {/* Add comment form */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-border space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this air quality report..."
          className="w-full p-3 bg-white dark:bg-slate-800 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          rows={3}
        />
        <Button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="w-full bg-primary hover:bg-primary/90 gap-2"
        >
          <Send className="w-4 h-4" />
          Post Comment
        </Button>
      </div>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-sm">{comment.author}</span>
              <span className="text-xs text-muted-foreground">{comment.date}</span>
            </div>
            <p className="text-sm text-foreground mb-3">{comment.text}</p>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="space-y-3 mt-3">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">{reply.author}</span>
                      <span className="text-xs text-muted-foreground">{reply.date}</span>
                    </div>
                    <p className="text-sm text-foreground">{reply.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
