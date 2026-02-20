---
title: Pricing and Business Model Intro
sidebar_position: 2
description: Understanding costs and revenue
---

# Pricing and Business Model Intro

Ratio1 allows Cloud Service Providers (CSPs) to operate deployments for clients using a decentralized network of compute nodes. The pricing model is designed to ensure fair compensation for node operators, predictable deployment costs for CSPs, and competitive infrastructure pricing compared to traditional cloud providers.

For current public pricing information, see [Ratio1 Pricing](https://ratio1.ai/pricing).

## How deployment costs work

Every deployment on Ratio1 is funded in advance through a CSP-owned escrow smart contract.

The total cost of a job depends on:

- required compute resources (CPU, GPU, memory, storage)
- number of nodes or replicas
- deployment duration
- network availability requirements

Before a workload starts, the required budget is locked in escrow. This guarantees that node operators will be paid for completed work and that deployments can run without interruption due to missing funds.

## Rewards distribution

When jobs run successfully:

- participating nodes earn **Proof of AI (PoAI)** rewards for executed workloads
- oracle infrastructure ensures validation, uptime monitoring, and consensus
- settlement is handled automatically through the escrow smart contract

Oracle nodes themselves receive **Proof of Availability (PoA)** rewards but do not receive PoAI from job execution.

## CSP revenue model

Ratio1 does not dictate how CSPs charge their clients.

A CSP typically:

1. agrees on pricing with their client (fiat or other terms)
2. converts the infrastructure portion into supported onchain funding
3. funds the deployment escrow
4. keeps their service margin separately

This means CSPs:

- retain full ownership of customer relationships  
- control their pricing strategy  
- can bundle additional services (support, integration, monitoring, consulting)

## Protocol pricing governance

At the current stage, baseline infrastructure pricing is defined by the Ratio1 protocol to ensure:

- fair compensation for active node operators  
- predictable deployment costs for CSPs  
- stable economic conditions for the ecosystem  

The pricing structure is intentionally designed to remain highly competitive and typically provides a strong cost advantage compared to traditional hyperscale cloud providers.

As the network matures, **Cloud Service Providers and Node Operators are expected to play an increasing role in protocol pricing governance**. Future iterations of the ecosystem are planned to introduce structured debate and voting mechanisms that allow active participants to help shape pricing policies and economic parameters.

## Summary

In practice:

- deployments are pre-funded via escrow  
- node operators are paid automatically for verified work  
- CSPs freely define their client pricing and margins  
- protocol pricing aims to balance fairness, sustainability, and competitiveness  

---

## Notable date

- Reviewed on **February 20, 2026**.
