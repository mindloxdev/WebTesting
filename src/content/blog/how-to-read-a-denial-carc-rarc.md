---
title: "How to read a denial: CARC and RARC codes, explained"
excerpt: "Remittance codes are the payer telling you exactly why it did not pay. Here is how to decode them and turn them into a prevention plan."
category: "Denials"
date: "2026-08-25"
author: "mindlox-team"
---
Every electronic remittance carries a set of standardized codes that explain how the payer adjudicated the claim. Read correctly, they are a map of where your revenue cycle is leaking. Read casually, they become a queue of claims that get reworked one at a time while the same problem repeats next week.

## The two code sets

Claim Adjustment Reason Codes, or CARCs, state why an amount was adjusted or denied. Remittance Advice Remark Codes, or RARCs, add detail that the CARC alone does not carry, such as what documentation was missing. Each CARC is paired with a group code that says who is responsible for the amount.

- CO, contractual obligation: the provider cannot bill the patient for this amount. Most true denials arrive here.
- PR, patient responsibility: deductible, coinsurance, copay, or a non-covered service the patient can be billed for.
- OA, other adjustment: used when neither CO nor PR applies, often for coordination-of-benefits situations.
- PI, payer-initiated reduction: the payer reduced payment for a reason that is not a contractual obligation.

## Codes you will see constantly

- CO-16: the claim lacks information or has a billing error. Almost always paired with a RARC that names the missing element.
- CO-18: duplicate claim or service. Usually a resubmission that crossed with the original in process.
- CO-29: the time limit for filing has expired. This one is rarely recoverable, which is why timely-filing tracking matters.
- CO-50: the service is not deemed medically necessary. Diagnosis-to-procedure support or payer coverage policy is the usual root cause.
- CO-97: the benefit for this service is included in another service already adjudicated. Bundling and modifier logic.
- CO-197: precertification, authorization, or notification is absent.
- CO-4: the procedure code is inconsistent with the modifier, or a required modifier is missing.
- CO-11: the diagnosis is inconsistent with the procedure.
- PR-1, PR-2, PR-3: deductible, coinsurance, and copay. Not denials, but they decide the patient statement.

## From codes to a taxonomy

The value is not in knowing what CO-197 means. It is in grouping every denial into a small set of root causes that each have an owner and a prevention step. Authorization denials belong to the front desk and the authorization workflow. Medical necessity denials belong to coding and documentation. Eligibility denials belong to registration. Timely filing belongs to submission cadence and A/R follow-up. When each category has a name, a count, and a dollar value, the practice can decide what to fix first.

## A simple weekly routine

- Pull every denial from the week and tag it with its root-cause category, not just its CARC.
- Rank categories by recoverable dollars, not by count. Ten small eligibility denials may matter less than two large authorization denials.
- Appeal what is appealable with the documentation the payer's policy asks for, and track the deadline for each level.
- Send the top prevention fix back to the team that owns it, and check next week whether the category shrank.

> The payer has already told you why. The work is to listen at the level of patterns instead of claims.
