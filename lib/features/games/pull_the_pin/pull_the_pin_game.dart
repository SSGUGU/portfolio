import 'package:flame/components.dart';
import 'package:flame/game.dart';
import 'package:flame/input.dart';
import 'package:flutter/material.dart';

/// PullThePinGame – a simple Flame game where the player drags a pin
/// to a target zone. Implements pause, resume, and reset.
class PullThePinGame extends FlameGame with HasDraggables, HasTappables {
  late SpriteComponent _pin;
  late Rect _targetZone;
  bool _isPaused = false;

  @override
  Future<void> onLoad() async {
    await super.onLoad();
    // Load pin sprite (placeholder if asset missing)
    _pin = SpriteComponent()
      ..sprite = await loadSprite('games/pull_the_pin/pin.png')
      ..size = Vector2(64, 64)
      ..position = Vector2(size.x / 2, size.y - 80);
    add(_pin);

    // Define target zone (bottom centre area)
    _targetZone = Rect.fromLTWH(
      size.x / 2 - 40,
      size.y - 150,
      80,
      80,
    );
  }

  @override
  void update(double dt) {
    if (_isPaused) return;
    super.update(dt);
  }

  @override
  void render(Canvas canvas) {
    super.render(canvas);
    // Draw target zone (semi‑transparent)
    final paint = Paint()..color = const Color(0x5500FF00);
    canvas.drawRect(_targetZone, paint);
  }

  // ---------- Lifecycle ----------
  void pauseGame() => _isPaused = true;
  void resumeGame() => _isPaused = false;
  void resetGame() {
    _pin.position = Vector2(size.x / 2, size.y - 80);
    _isPaused = false;
  }

  // ---------- Input handling ----------
  @override
  bool onDragUpdate(int pointerId, DragUpdateInfo info) {
    if (_isPaused) return false;
    // Move pin with drag, keeping within bounds
    final newPos = _pin.position + info.delta.global;
    _pin.position = Vector2(
      newPos.x.clamp(0, size.x - _pin.size.x),
      newPos.y.clamp(0, size.y - _pin.size.y),
    );
    // Check win condition
    if (_targetZone.contains(_pin.toRect().center)) {
      // Simple success overlay (could be replaced with Riverpod event)
      overlays.add('SuccessOverlay');
      pauseGame();
    }
    return true;
  }
}
