import React from 'react'
import { Table, TableCaption, TableHead, TableHeader, TableRow } from '../ui/table'

function ApplicantsTable() {
  return (
    <div>
        <Table>
            <TableCaption>
                A list of applied users in your job
            </TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>

                </TableRow>
            </TableHeader>
        </Table>
    </div>
  )
}

export default ApplicantsTable