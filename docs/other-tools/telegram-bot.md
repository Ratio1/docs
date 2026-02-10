---
title: Telegram Bot
sidebar_position: 1
description: using the Ratio1 Telegram Bot
---

# Telegram Bot

The Ratio1 Telegram Bot is a lightweight monitoring interface for node operators.
It helps track wallet-linked nodes and receive status updates directly in Telegram, without opening dashboards or running manual checks each time.

## What it is and who it is for

This bot is useful for:

- Node operators managing one or multiple wallets.
- Teams that want quick operational checks from mobile.
- Anyone who needs simple "is it online?" visibility during the day.

Typical goals:

- Track node availability for specific wallets.
- Receive offline and recovery notifications.
- Quickly inspect wallet node status using short commands.

## Quick Start

1. Open Telegram and start a private conversation with the [Ratio1 Telegram Bot](https://t.me/Ratio1ai_bot).
2. Run:

```text
/start
```

3. Add a wallet to monitor:

```text
/watch <wallet_address>
```

All nodes linked to licenses owned by this wallet will start being monitored.

4. Confirm the wallets you are tracking:

```text
/watchlist
```

## Common usage flows

### Flow 1: Start monitoring a new wallet

```text
/watch 0x1234567890abcdef1234567890abcdef12345678
/watchlist
```

Use this when onboarding a new wallet to daily monitoring.

### Flow 2: Quick operational health check

```text
/nodes
```

Use this to quickly check whether wallet nodes are currently online.

### Flow 3: Stop monitoring a wallet

```text
/unwatch 0x1234567890abcdef1234567890abcdef12345678
```

Use this when a wallet is no longer relevant for alerts.

## Commands

| Command                     | Purpose                                                        | Example                  |
| --------------------------- | -------------------------------------------------------------- | ------------------------ |
| `/start`                    | Initializes the chat and shows how to begin.                   | `/start`                 |
| `/watch <wallet_address>`   | Starts monitoring nodes linked to a wallet.                    | `/watch 0x1234...abcd`   |
| `/watchlist`                | Shows all wallets currently being monitored.                   | `/watchlist`             |
| `/unwatch <wallet_address>` | Stops monitoring one wallet.                                   | `/unwatch 0x1234...abcd` |
| `/unwatchall`               | Stops monitoring all tracked wallets.                          | `/unwatchall`            |
| `/nodes`                    | Lists nodes for your watched wallets and their current status. | `/nodes`                 |

## When you receive messages

- You receive a message when a node from a watched wallet is detected as offline.
- You receive another message when that node comes back online.

Typical messages:

```text
⚠️ Node node-alias (0xABCD...1234) is offline. Please check your node status.
```

```text
✅ Node node-alias (0xABCD...1234) is back online.
```

## For Developers

This bot also serves as a practical open-source example of how to build Telegram bots on Ratio1.

Main pieces:

- `reply(...)` handles Telegram commands such as `/watch`, `/watchlist`, `/unwatch`, and `/nodes`.
- `loop_processing(...)` runs periodically to detect offline or recovered nodes and send notifications.
- `create_telegram_simple_bot(...)` deploys the bot pipeline on a Ratio1 node with both handlers attached.

In practice, command handling and periodic monitoring are separated, which keeps the bot responsive while still sending asynchronous alerts.

Tutorial code:
[github.com/Ratio1/ratio1_sdk/blob/main/tutorials/ex21_telegram_community_bot.py](https://github.com/Ratio1/ratio1_sdk/blob/main/tutorials/ex21_telegram_community_bot.py)

The blog post includes a more in-depth review of the same code flow:
[Stay in control: how to use the Ratio1 Telegram Bot to monitor your nodes](https://ratio1.ai/blog/stay-in-control-how-to-use-the-ratio1-telegram-bot-to-monitor-your-nodes)
