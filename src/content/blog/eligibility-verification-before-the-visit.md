---
title: "Eligibility verification before the visit: the front-end fix for back-end denials"
excerpt: "Most eligibility denials are decided before the patient sits down. What a pre-visit verification workflow should check, and how to measure whether it works."
category: "Front end"
date: "2026-07-14"
author: "mindlox-team"
---
Eligibility denials are the most preventable category in the revenue cycle. The payer is not disputing the care, the code, or the documentation. It is saying the coverage on the claim did not exist, did not apply, or belonged to someone else on the date of service. Every one of those facts was knowable before the visit.

## What a verification checks

An electronic eligibility inquiry, the 270 transaction, returns a 271 response from the payer. The response is more than an active-or-inactive flag. A complete check reads and records the details that decide the claim and the patient statement.

- Coverage status on the planned date of service, not just today.
- Plan type and payer ID, including whether a Medicare beneficiary is enrolled in a Medicare Advantage plan.
- Copay, deductible remaining, coinsurance, and out-of-pocket status for the visit type.
- Whether the service requires prior authorization or a referral under this plan.
- Secondary or tertiary coverage, and which plan is primary under coordination of benefits.
- Network status of the rendering provider and the location.

## The denials it prevents

- CO-27: expenses incurred after coverage terminated.
- CO-31: patient cannot be identified as the payer's insured. Usually a demographic or member ID mismatch.
- CO-22: the care may be covered by another payer under coordination of benefits.
- CO-109: the claim was sent to the wrong payer or contractor.
- CO-197: authorization absent, when the check would have shown the requirement.

## A workflow that holds up

- Run batch verification two to three days before scheduled visits, so problems can be resolved by phone before the patient arrives.
- Re-verify on the day of service for plans that change frequently and for any patient whose coverage was flagged.
- Capture the response in the practice management system so front-desk staff and billers see the same answer.
- Collect known patient responsibility at check-in, using the deductible and copay figures from the response.
- Route any authorization requirement to the authorization desk the moment the check reveals it.

## How to know it is working

Track eligibility-related denials as their own category, by count and by dollars, and watch the trend after the workflow changes. Track the share of visits verified before the appointment. Track point-of-service collections. When the first number falls and the other two rise, the front end is doing the job the back end used to pay for.

> A denial discovered thirty days after the visit is a verification that was skipped thirty days before it.
