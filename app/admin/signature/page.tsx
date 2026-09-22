import React from 'react'
import { createAdminClient } from '@/utils/supabase/server'
import { SignatureItem } from './SignatureItem'

export const dynamic = 'force-dynamic'

export default async function SignatureAdminPage() {
  const supabase = createAdminClient()
  
  // Fetch ALL signature images, active or inactive
  const { data: images, error } = await supabase
    .from('signature_images')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    return <div className="text-red-500">Error loading signature images: {error.message}</div>
  }

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="font-display text-4xl mb-2">Signature Images</h2>
          <p className="text-bone/60 text-sm">Manage the carousel of images in the Signature Carousel section.</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {images?.map((image) => (
          <SignatureItem key={image.id} image={image} />
        ))}
        
        {(!images || images.length === 0) && (
          <div className="p-8 text-center border border-white/10 rounded-xl text-bone/60">
            No signature images found in database.
          </div>
        )}
      </div>
    </div>
  )
}
