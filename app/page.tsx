"use client";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useEffect } from "react";

const formSchema = z.object({
	gender: z.enum(["male", "female"], {
		message: "You need to select a gender.",
	}),
	age: z
		.number()
		.min(1, {
			message: "Age must be at least 1.",
		})
		.max(120, {
			message: "Age cannot exceed 120.",
		}),
	height: z
		.number()
		.min(50, {
			message: "Height must be at least 50 cm.",
		})
		.max(250, {
			message: "Height cannot exceed 250 cm.",
		})
		.optional(),
	weight: z
		.number()
		.min(20, {
			message: "Weight must be at least 20 kg.",
		})
		.max(300, {
			message: "Weight cannot exceed 300 kg.",
		})
		.optional(),
});

export default function Home() {
	const [bmr, setBmr] = useState<number | null>(null);
	const [tdee, setTdee] = useState<number | null>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			gender: "male",
			age: undefined,
			height: undefined,
			weight: undefined,
		},
	});

	const calculateBmr = (
		gender: "male" | "female",
		age: number,
		height: number,
		weight: number
	) => {
		let calculatedBmr: number;
		if (gender === "male") {
			calculatedBmr = 10 * weight + 6.25 * height - 5 * age + 5;
		} else {
			calculatedBmr = 10 * weight + 6.25 * height - 5 * age - 161;
		}
		setBmr(calculatedBmr);
		setTdee(null); // Reset TDEE when BMR is recalculated
	};

	// Watch for changes in form fields
	const watchedAge = form.watch("age");
	const watchedHeight = form.watch("height");
	const watchedWeight = form.watch("weight");
	const watchedGender = form.watch("gender");

	// Trigger BMR calculation when relevant fields change and are valid
	useEffect(() => {
		const values = form.getValues();
		if (
			form.formState.isValid &&
			values.age !== undefined &&
			values.height !== undefined &&
			values.weight !== undefined
		) {
			calculateBmr(values.gender, values.age, values.height, values.weight);
		} else {
			setBmr(null);
			setTdee(null);
		}
	}, [
		watchedAge,
		watchedHeight,
		watchedWeight,
		watchedGender,
		form.formState.isValid,
		form,
	]);

	const handleActivityLevelChange = (activityFactor: string) => {
		if (bmr === null) return;

		let factor = 0;
		switch (activityFactor) {
			case "sedentary":
				factor = 1.2;
				break;
			case "lightly_active":
				factor = 1.375;
				break;
			case "moderately_active":
				factor = 1.55;
				break;
			case "very_active":
				factor = 1.725;
				break;
			case "extra_active":
				factor = 1.9;
				break;
		}
		setTdee(bmr * factor);
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>BMR & TDEE Calculator</CardTitle>
					<CardDescription>
						Calculate your Basal Metabolic Rate and Total Daily Energy Expenditure.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form className="space-y-4">
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>Gender</FormLabel>
										<FormControl>
											<RadioGroup
												onValueChange={field.onChange}
												defaultValue={field.value}
												className="flex flex-col space-y-1"
											>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="male" />
													</FormControl>
													<FormLabel className="font-normal">Male</FormLabel>
												</FormItem>
												<FormItem className="flex items-center space-x-3 space-y-0">
													<FormControl>
														<RadioGroupItem value="female" />
													</FormControl>
													<FormLabel className="font-normal">Female</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Age (years)</FormLabel>
										<FormControl>
											<Input
												type="number"
												{...field}
												onChange={(event) => field.onChange(parseFloat(event.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="height"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Height (cm)</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.1"
												{...field}
												onChange={(event) => field.onChange(parseFloat(event.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="weight"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Weight (kg)</FormLabel>
										<FormControl>
											<Input
												type="number"
												step="0.1"
												{...field}
												onChange={(event) => field.onChange(parseFloat(event.target.value))}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
				<CardFooter>
					{bmr !== null && (
						<div className="w-full text-center">
							<h3 className="text-lg font-semibold">
								Your BMR: {bmr.toFixed(2)} calories/day
							</h3>
							<div className="mt-4">
								<p className="mb-2">Select your activity level to calculate TDEE:</p>
								<Select onValueChange={handleActivityLevelChange}>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Activity Level" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="sedentary">Sedentary (x1.2)</SelectItem>
										<SelectItem value="lightly_active">
											Lightly Active (x1.375)
										</SelectItem>
										<SelectItem value="moderately_active">
											Moderately Active (x1.55)
										</SelectItem>
										<SelectItem value="very_active">Very Active (x1.725)</SelectItem>
										<SelectItem value="extra_active">Extra Active (x1.9)</SelectItem>
									</SelectContent>
								</Select>
								{tdee !== null && (
									<h3 className="text-lg font-semibold mt-4">
										Your TDEE: {tdee.toFixed(2)} calories/day
									</h3>
								)}
							</div>
						</div>
					)}
				</CardFooter>
			</Card>
			<footer className="flex justify-center py-6 w-full shrink-0 items-center px-4 md:px-6">
				<div className="container flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-2 md:px-6">
					<nav className="flex gap-4 sm:gap-6">
						<a
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-primary hover:underline"
							href="https://github.com/shanefully-done/bmr-tdee-calculator"
							target="_blank"
							rel="noopener noreferrer"
						>
							GitHub
						</a>
						<a
							className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 text-primary hover:underline"
							href="https://www.ixtj.dev/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Blog
						</a>
					</nav>
				</div>
			</footer>
		</main>
	);
}
