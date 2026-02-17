---
title: Navigating the Tutorials
sidebar_position: 2
description: list of tutorials and explanations
---

# Navigating the Tutorials

The `ratio1_sdk` repository contains a large `tutorials/` set. Use this page as a route map by
objective, not as an equal-priority list.

## Recommended progression

1. **Network/session basics**:
   - `ex01_part1_connect.py`
   - `ex01_part2_filter.py`
   - `ex01_part3_adv_filter.py`
2. **First deployments**:
   - `ex02_part1_deploy_webapi.py`
   - `ex02_part2_deploy_plugin.py`
   - `ex02_part3_deploy_r1fs_test.py`
3. **Custom code execution**:
   - `ex03`, `ex04`, `ex05` (single-remote custom code patterns)
   - `ex06`, `ex07` (multi-remote/distributed patterns)
4. **Web apps and app runners**:
   - `ex08_custom_webapi.py`
   - `ex13_launch_repo_based_webapp.py`
   - `ex16_launch_repo_based_http_server.py`
   - `ex17_launch_repo_based_balanced_webapp.py`
   - `ex18_deploy_container_webapi.py`
5. **Deeploy and operational examples**:
   - `ex19_deeploy_container_example.py`
   - `ex20_deeploy_telegram_bot.py`
   - `ex22_deeploy_custom_code.py`
   - `ex23_deploy_worker_app.py`
6. **Bots and operational examples**:
   - `ex10`, `ex11`, `ex12` (telegram bot patterns)
   - `ex21_telegram_community_bot.py`
7. **Newer specialized examples**:
   - `ex24_multi_video_stream_monitor.py`
   - `ex25_local_serving_api.py`
   - `ex26_cerviguard_war_loopback.py`

## Tutorial groups and intent

- **Learning/tutorial-first**:
  - `ex01*`, `ex02*`, `ex03*`, `ex04*`, `ex05*`, `ex06*`, `ex07*`
- **Integration/app patterns**:
  - `ex08`, `ex09`, `ex13`, `ex16`, `ex17`, `ex18`
- **Deeploy/operations patterns**:
  - `ex19`, `ex20`, `ex22`, `ex23`
- **Specialized demos**:
  - `ex14_wallets.py`
  - `ex15_telegram_rogue_style_game.py`
  - `ex24`, `ex25`, `ex26`
  - `8. custom_code_fastapi_assets/*`, `9. code_sandbox_from_scratch_assets/*`, `26_cerviguard_war_loopback/*`
  - `eth2025/*`
  - `video_presentation/*`

## Reading guidance

- Start from examples that match your immediate use case; do not run all tutorials linearly.
- For production work, prioritize patterns that align with current managed deployment surfaces.
- Treat older tutorial flows as implementation references and adapt to current runtime/package behavior.
- Repository tutorials are source assets and are not guaranteed to be installed in your local wheel/site-package.

## Ground truth references

Primary:
- https://github.com/Ratio1/ratio1_sdk
- https://pypi.org/project/ratio1/

Supporting:
- https://ratio1.ai/blog/ratio1-end-to-end-tutorial
- https://ratio1.ai/blog/deploying-a-custom-web-application
- https://ratio1.ai/blog/build-your-own-sandbox-in-minutes
- https://ratio1.ai/blog/deep-dive-into-the-ratio1-community-telegram-bot-network-insights-for-everyone

## Notable date
- Reviewed on **February 17, 2026**.

## Next steps
- Back to [Python](../).
