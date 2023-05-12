
export const setRefRecordStatus = async ({
  refRecord,
  status
}) => {
  refRecord.status = status
  if (!refRecord.updated) return
  const updatedRefRecord = await refRecord.save()
  if (updatedRefRecord !== refRecord) {
    throw new Error(`Failed to update ref record status to ${status}`)
  }
}
