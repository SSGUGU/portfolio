// success_overlay.dart
import 'package:flutter/material.dart';
import 'pull_the_pin_game.dart';

class SuccessOverlay extends StatelessWidget {
  final PullThePinGame game;
  const SuccessOverlay({Key? key, required this.game}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ElevatedButton(
        onPressed: () {
          game.resetGame();
          game.overlays.remove('SuccessOverlay');
          game.resumeGame();
        },
        child: const Text('You pulled the pin! Play again'),
      ),
    );
  }
}
