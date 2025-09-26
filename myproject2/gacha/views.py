from django.shortcuts import render

# gacha/views.py
import random
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# gacha/views.py に追加
@csrf_exempt
def index(request):
    return render(request, "gacha/index.html")

def gacha_draw(request):
    # レアリティごとの確率
    rarity_table = [
        ("SSR", 33, "伝説の剣", "/static/img/ダウンロード (1).jpg", "/static/video/ssr.mp4"),
        ("SR", 33, "魔法の杖", "/static/img/ダウンロード (2).jpg", "/static/video/sr.mp4"),
        ("R", 34, "木の棒", "/static/img/ダウンロード (3).jpg", "/static/video/r.mp4"),
    ]

    # 抽選
    rnd = random.randint(1, 100)
    acc = 0
    result = None
    for rarity, prob, item, img, video in rarity_table:
        acc += prob
        if rnd <= acc:
            result = {
                "rarity": rarity,
                "item": item,
                "image": img,
                "video": video,
            }
            break

    return JsonResponse(result)
