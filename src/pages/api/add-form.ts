import type { APIRoute } from "astro";
import { displayFormData, sendFormToFirestore, validateFormData } from "../../utils/utils";
import type { FormSubmissionData } from "../../env";
import { FieldValue, Timestamp } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {

  // process form data and destructure it
  const formData = await request.formData()
  const email = formData.get("email")?.toString()
  const firstName = formData.get("firstName")?.toString()
  const lastName = formData.get("lastName")?.toString()
  const uin = formData.get("uin")?.toString()
  const gender = formData.get("gender")?.toString()
  const year = formData.get("year")?.toString()
  const availability = formData.get("availability")?.toString()
  const moreAvailability = formData.get("moreAvailability")?.toString() 
  const dietaryRestriction = formData.getAll("dietaryRestriction").map(item => item.toString())
  const otherDietaryRestriction = formData.get("otherDietaryRestriction")?.toString()
  const shirtSize = formData.get("shirtSize")?.toString()
  const teamPlan = formData.get("teamPlan")?.toString()
  const preWorkshops = formData.getAll("preWorkshops").map(item => item.toString())
  const jobType = formData.get("jobType")?.toString()
  const otherJobType = formData.get("otherJobType")?.toString()
  const resumeLink = formData.get("resumeLink")?.toString()
  const appStatus = formData.get("appStatus")?.toString()
  displayFormData(email, firstName, lastName, uin, gender, year, availability, moreAvailability, dietaryRestriction, otherDietaryRestriction, shirtSize, teamPlan, preWorkshops, jobType, otherJobType, resumeLink)


  // validate the input
  const validateFormResult = validateFormData(firstName, lastName, uin, gender, year, availability, dietaryRestriction, otherDietaryRestriction, shirtSize, teamPlan, preWorkshops, jobType, otherJobType)
  if (!validateFormResult.success) {
    return new Response(`Incorrect form data: ${validateFormResult.msg}`, { status: 400 })
  }
  
  try {
    const formSubmissionData = {
      email,
      firstName,
      lastName,
      uin: parseInt(uin as string),
      gender,
      year,
      availability,
      moreAvailability: moreAvailability || "",
      dietaryRestriction,
      otherDietaryRestriction: (dietaryRestriction.includes("Other"))? otherDietaryRestriction : "",
      shirtSize,
      teamPlan,
      preWorkshops,
      jobType: jobType || "",
      otherJobType: (jobType === "Other") ? otherJobType : "",
      resumeLink: resumeLink || "",
      appStatus: appStatus,
      createdAt: Timestamp.fromDate(new Date("2025-01-24T21:42:18.000Z")) //FieldValue.serverTimestamp() // UTC = Chicago + 6hr
    } as FormSubmissionData

    console.log("Submmitting form for:", email)

    // submit form data to database
    await sendFormToFirestore(formSubmissionData)

    // wait for success, if not success then decline
    return new Response(`Successful: ${email}`)
  }
  catch (err) {
    console.log(`Something is wrong with submitting form for ${email}`, err)
    return new Response(`Something is wrong with submitting form for ${email}`, { status: 500 })
  }

}