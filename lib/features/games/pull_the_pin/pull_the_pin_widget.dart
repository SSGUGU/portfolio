import 'package:flutter/material.dart';
import 'package:flame/game.dart';
import 'pull_the_pin_game.dart';
import 'success_overlay.dart';

/// Widget that embeds the PullThePinGame as a GameWidget.
class PullThePinWidget extends StatelessWidget {
  const PullThePinWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final game = PullThePinGame();
    // Register the success overlay if not already registered.
    if (!game.overlays.isActive('SuccessOverlay')) {
      game.overlays.addEntry(
        'SuccessOverlay',
        (context, game) => SuccessOverlay(game: game as PullThePinGame),
      );
    }
    return GameWidget(game: game);
  }
}
