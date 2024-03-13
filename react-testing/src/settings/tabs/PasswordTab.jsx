import React from 'react'
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { z } from 'zod'
import { useToast } from '@/components/ui/use-toast'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'


const formSchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string(),
	repeatPassword: z.string()
}).refine(data => data.newPassword !== data.currentPassword, {
	message: "New password must be different from current password",
	path: ["newPassword"]
}).refine(data => data.newPassword === data.repeatPassword, {
	message: "Passwords must match",
	path: ["repeatPassword"]
})

export const PasswordTab = () => {
	const { toast } = useToast();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			repeatPassword: ""
		}
	});

	const onSubmit = () => {
		toast({ title: "Success", text: "Password changed" })
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Password</CardTitle>
				<CardDescription>
					Change your password here. After saving, you'll be logged out.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
						<FormField
							control={form.control}
							name="currentPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Current Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="newPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>New Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="New Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="repeatPassword"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Repeat Password</FormLabel>
									<FormControl>
										<Input type="password" placeholder="Repeat Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
