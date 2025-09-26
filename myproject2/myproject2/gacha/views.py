from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import random

@csrf_exempt
def index(request):
    return render(request, "gacha/index.html")

def gacha_draw(request):
    # レアリティごとの確率と動画パス
    rarity_table = [
        ("SSR", 3, "伝説の剣", "/static/gacha/video/ssr.mp4"),
        ("SR", 12, "魔法の杖", "/static/gacha/video/sr.mp4"),
        ("R", 85, "木の棒", "/static/gacha/video/r.mp4"),
    ]

    rnd = random.randint(1, 100)
    acc = 0
    result = None
    for rarity, prob, item, video in rarity_table:
        acc += prob
        if rnd <= acc:
            result = {
                "rarity": rarity,
                "item": item,
                "video": video
            }
            break
    return JsonResponse(result)
