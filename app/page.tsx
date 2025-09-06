"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  MapPin,
  Star,
  Clock,
  QrCode,
  Bell,
  User,
  ChevronRight,
  Ticket,
  Gift,
  Phone,
  Globe,
  Navigation,
  Check,
  MessageCircle,
  Send,
  Smile,
} from "lucide-react"

// Mock data
const userProfile = {
  name: "田中 太郎",
  avatar: "/japanese-user-avatar.jpg",
  totalPoints: 2450,
  membershipLevel: "ゴールド",
}

const stores = [
  {
    id: 1,
    name: "カフェ・ドリーム",
    category: "カフェ",
    points: 850,
    nextReward: 1000,
    distance: "0.2km",
    coupons: 2,
    image: "/coffee-shop-logo.png",
    address: "東京都渋谷区神南1-15-3",
    phone: "03-1234-5678",
    hours: "7:00-22:00",
    website: "www.cafe-dream.jp",
    description: "こだわりのコーヒーと手作りスイーツが自慢のカフェです。",
    pendingPoints: 50,
  },
  {
    id: 2,
    name: "ファッション・スタイル",
    category: "ファッション",
    points: 1200,
    nextReward: 1500,
    distance: "0.5km",
    coupons: 1,
    image: "/fashion-store-logo.png",
    address: "東京都渋谷区表参道3-6-12",
    phone: "03-2345-6789",
    hours: "10:00-21:00",
    website: "www.fashion-style.jp",
    description: "最新トレンドを取り入れたファッションアイテムを豊富に取り揃えています。",
    pendingPoints: 120,
  },
  {
    id: 3,
    name: "グルメ・パラダイス",
    category: "レストラン",
    points: 400,
    nextReward: 500,
    distance: "0.8km",
    coupons: 3,
    image: "/restaurant-logo.png",
    address: "東京都渋谷区道玄坂2-10-7",
    phone: "03-3456-7890",
    hours: "11:00-23:00",
    website: "www.gourmet-paradise.jp",
    description: "新鮮な食材を使った創作料理をお楽しみいただけます。",
    pendingPoints: 75,
  },
]

const coupons = [
  {
    id: 1,
    store: "カフェ・ドリーム",
    title: "コーヒー1杯無料",
    description: "ドリンク購入でコーヒー1杯プレゼント",
    expiry: "2024-12-31",
    discount: "¥300相当",
    image: "/coffee-coupon.png",
    terms: "他のクーポンとの併用不可。1日1回まで。",
    barcode: "1234567890123",
  },
  {
    id: 2,
    store: "ファッション・スタイル",
    title: "20%オフクーポン",
    description: "全商品20%割引（セール品除く）",
    expiry: "2024-12-25",
    discount: "最大¥5000",
    image: "/placeholder-gmag2.png",
    terms: "¥10,000以上のお買い上げで利用可能。",
    barcode: "2345678901234",
  },
  {
    id: 3,
    store: "グルメ・パラダイス",
    title: "デザート無料",
    description: "ランチセット注文でデザート1品無料",
    expiry: "2024-12-20",
    discount: "¥500相当",
    image: "/placeholder-vtwdw.png",
    terms: "平日ランチタイム限定。要予約。",
    barcode: "3456789012345",
  },
]

const nearbyStores = [
  {
    id: 4,
    name: "ブックカフェ・リーディング",
    category: "カフェ・書店",
    distance: "0.3km",
    rating: 4.5,
    openUntil: "22:00",
    hasPoints: true,
    image: "/placeholder-prk07.png",
  },
  {
    id: 5,
    name: "ヘルシー・デリ",
    category: "デリカテッセン",
    distance: "0.6km",
    rating: 4.2,
    openUntil: "20:00",
    hasPoints: true,
    image: "/healthy-deli-logo.jpg",
  },
  {
    id: 6,
    name: "テック・ガジェット",
    category: "電子機器",
    distance: "1.2km",
    rating: 4.7,
    openUntil: "21:00",
    hasPoints: false,
    image: "/tech-gadget-store-logo.jpg",
  },
]

export default function MembershipApp() {
  const [selectedStore, setSelectedStore] = useState<number | null>(null)
  const [showMembershipCard, setShowMembershipCard] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null)
  const [showPointCollection, setShowPointCollection] = useState(false)
  const [collectingStore, setCollectingStore] = useState<any>(null)
  const [collectionStatus, setCollectionStatus] = useState<"pending" | "success" | "error">("pending")
  const [chatMessage, setChatMessage] = useState("")

  const handleCollectPoints = (storeId: number) => {
    const store = stores.find((s) => s.id === storeId)
    if (store) {
      setCollectingStore(store)
      setShowPointCollection(true)
      setCollectionStatus("pending")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-700 to-blue-800 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-green-800 rounded-full flex items-center justify-center">
              <span className="text-xl text-white">🐬</span>
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">イルカメンバーズ</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-sm border border-gray-200">
            <TabsTrigger
              value="home"
              className="text-xs font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              ホーム
            </TabsTrigger>
            <TabsTrigger
              value="points"
              className="text-xs font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              ポイント
            </TabsTrigger>
            <TabsTrigger
              value="coupons"
              className="text-xs font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              クーポン
            </TabsTrigger>
            <TabsTrigger
              value="stores"
              className="text-xs font-medium data-[state=active]:bg-green-500 data-[state=active]:text-white"
            >
              店舗
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-4">
            <Card className="bg-white shadow-lg border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  イルカメンバーズ サポート
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Chat Messages */}
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-500 text-white text-xs">🐬</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                      <p className="text-sm">こんにちは！イルカメンバーズへようこそ🐬</p>
                      <p className="text-sm mt-1">ポイントやクーポンについてご質問があればお気軽にどうぞ！</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
                      <p className="text-sm">ありがとうございます！</p>
                    </div>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                      <AvatarFallback>田</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-500 text-white text-xs">🐬</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                      <p className="text-sm">会員証の表示やクーポンの使い方など、何でもサポートいたします！</p>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="メッセージを入力..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <Button size="icon" className="bg-green-500 hover:bg-green-600 rounded-full">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Dialog open={showMembershipCard} onOpenChange={setShowMembershipCard}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:scale-105">
                    <CardContent className="p-6 text-center">
                      <QrCode className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                      <p className="text-sm font-bold text-blue-800">会員証表示</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle className="text-center">イルカメンバーズ会員証</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-lg">
                      <div className="bg-gradient-to-r from-blue-400 to-green-500 p-4 text-white text-center">
                        <h3 className="font-bold text-lg">🐬 イルカメンバーズ</h3>
                        <p className="text-sm opacity-90">DOLPHIN MEMBERS</p>
                      </div>

                      {/* Member Info */}
                      <div className="p-4 text-center">
                        <div className="mb-4">
                          <Avatar className="h-12 w-12 mx-auto mb-2">
                            <AvatarImage src={userProfile.avatar || "/placeholder.svg"} alt={userProfile.name} />
                            <AvatarFallback>田</AvatarFallback>
                          </Avatar>
                          <p className="font-semibold text-gray-800">{userProfile.name}</p>
                          <p className="text-sm text-gray-600">会員番号: 123456</p>
                        </div>

                        {/* Barcode */}
                        <div className="bg-white border border-gray-300 rounded p-3 mb-4">
                          <div className="flex justify-center items-center space-x-px">
                            {Array.from({ length: 30 }, (_, i) => (
                              <div
                                key={i}
                                className="bg-black"
                                style={{
                                  width: Math.random() > 0.5 ? "2px" : "1px",
                                  height: "40px",
                                }}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-center mt-2 font-mono">1234567890123</p>
                        </div>

                        {/* Points Display */}
                        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-3">
                          <p className="text-sm text-gray-600">ご利用可能ポイント</p>
                          <p className="text-2xl font-bold text-blue-600">
                            {userProfile.totalPoints.toLocaleString()}
                            <span className="text-sm">pt</span>
                          </p>
                          <p className="text-xs text-gray-500">2024年12月31日まで有効</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      <p>レジでこのバーコードを提示してください</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <MapPin className="h-10 w-10 mx-auto mb-3 text-green-600" />
                  <p className="text-sm font-bold text-green-800">店舗検索</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Points Tab */}
          <TabsContent value="points" className="space-y-4">
            {stores.map((store) => (
              <Card key={store.id} className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{store.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {store.category}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>現在のポイント</span>
                          <span className="font-semibold text-blue-600">{store.points}pt</span>
                        </div>
                        <Progress value={(store.points / store.nextReward) * 100} className="h-2" />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">
                            次の特典まで {store.nextReward - store.points}pt
                          </p>
                          {store.pendingPoints > 0 && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-6 bg-gradient-to-r from-orange-400 to-pink-500 text-white border-0 hover:from-orange-500 hover:to-pink-600"
                              onClick={() => handleCollectPoints(store.id)}
                            >
                              <Gift className="h-3 w-3 mr-1" />+{store.pendingPoints}pt受取
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="coupons" className="space-y-4">
            {coupons.map((coupon) => (
              <Card key={coupon.id} className="overflow-hidden bg-white shadow-md">
                <CardContent className="p-0">
                  <div className="flex">
                    <div className="w-20 bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                      <Ticket className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{coupon.title}</h3>
                          <p className="text-xs text-muted-foreground">{coupon.store}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {coupon.discount}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{coupon.expiry}まで</span>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="bg-green-500 hover:bg-green-600">
                              使用する
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-sm">
                            <DialogHeader>
                              <DialogTitle>{coupon.title}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="text-center">
                                <div className="bg-gradient-to-br from-blue-500 to-green-500 p-6 rounded-lg text-white mb-4">
                                  <QrCode className="h-16 w-16 mx-auto mb-2" />
                                  <p className="text-sm font-mono">{coupon.barcode}</p>
                                </div>
                                <p className="text-sm font-semibold">{coupon.store}</p>
                                <p className="text-lg font-bold text-blue-600">{coupon.discount}</p>
                              </div>
                              <div className="space-y-2 text-sm">
                                <p>
                                  <strong>内容:</strong> {coupon.description}
                                </p>
                                <p>
                                  <strong>有効期限:</strong> {coupon.expiry}
                                </p>
                                <p>
                                  <strong>利用条件:</strong> {coupon.terms}
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-xs text-muted-foreground">レジでこのQRコードを提示してください</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Stores Tab */}
          <TabsContent value="stores" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">近くの店舗</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
              >
                <MapPin className="h-4 w-4 mr-1" />
                地図表示
              </Button>
            </div>

            {[...stores, ...nearbyStores].map((store) => (
              <Dialog key={store.id}>
                <DialogTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-200 bg-white">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={store.image || "/placeholder.svg"}
                          alt={store.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-sm">{store.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{store.rating || "4.5"}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{store.category}</span>
                            <span>{store.distance}</span>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-xs">
                              <Clock className="h-3 w-3" />
                              <span>{store.hours || store.openUntil + "まで営業"}</span>
                            </div>
                            {store.hasPoints !== false && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                ポイント対象
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
                  <DialogHeader>
                    <DialogTitle>{store.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <img
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      className="w-full h-32 rounded-lg object-cover"
                    />
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{store.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{store.rating || "4.5"}</span>
                        </div>
                      </div>

                      {store.description && <p className="text-sm text-muted-foreground">{store.description}</p>}

                      <div className="space-y-2 text-sm">
                        {store.address && (
                          <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                            <span>{store.address}</span>
                          </div>
                        )}
                        {store.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{store.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{store.hours || store.openUntil + "まで営業"}</span>
                        </div>
                        {store.website && (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span className="text-blue-600">{store.website}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Navigation className="h-4 w-4 text-muted-foreground" />
                          <span>{store.distance}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-green-500 hover:bg-green-600" size="sm">
                          <Navigation className="h-4 w-4 mr-1" />
                          道案内
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent border-green-500 text-green-600 hover:bg-green-50"
                          size="sm"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          電話
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showPointCollection} onOpenChange={setShowPointCollection}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center">ポイント受け取り申請</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {collectingStore && (
              <>
                <div className="text-center">
                  <img
                    src={collectingStore.image || "/placeholder.svg"}
                    alt={collectingStore.name}
                    className="h-16 w-16 mx-auto rounded-lg object-cover mb-3"
                  />
                  <h3 className="font-semibold text-lg">{collectingStore.name}</h3>
                </div>

                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200">
                    <QrCode className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-blue-800">店舗スタッフにこのQRコードを提示してください</p>
                      <div className="bg-white rounded p-2 border border-blue-200">
                        <p className="font-mono text-xs text-gray-600">
                          POINT-{collectingStore.id}-{Date.now().toString().slice(-6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 rounded-lg p-4 border border-orange-200">
                    <p className="text-2xl font-bold text-orange-600">+{collectingStore.pendingPoints}</p>
                    <p className="text-sm text-orange-700">ポイント（承認待ち）</p>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="h-2 w-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span>店舗での承認をお待ちください</span>
                    </div>
                    <p className="text-xs">スタッフがQRコードをスキャンするとポイントが付与されます</p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => setShowPointCollection(false)}
                    >
                      キャンセル
                    </Button>
                    <Button
                      className="flex-1 bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700"
                      onClick={() => {
                        setCollectionStatus("success")
                        setTimeout(() => {
                          setShowPointCollection(false)
                          setCollectionStatus("pending")
                        }, 3000)
                      }}
                    >
                      承認確認
                    </Button>
                  </div>
                </div>

                {collectionStatus === "success" && (
                  <div className="text-center space-y-4 absolute inset-0 bg-white flex flex-col justify-center">
                    <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-green-600 mb-2">承認完了！</p>
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-4">
                        <p className="text-2xl font-bold text-green-600">+{collectingStore.pendingPoints}</p>
                        <p className="text-sm text-green-700">ポイントが付与されました</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
