<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567
};
</script>
<template>
  <main>
    <body class="d-flex flex-column h-100">
        <main class="flex-shrink-0">
            <!-- Header-->
            <header class="py-5">
                <div class="container px-5 pb-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-xxl-5">
                            <!-- Header text content-->
                            <div class="text-center text-xxl-start">
                    	
                                <div class="fs-3 fw-light text-muted">당신의 아늑한 집을 찾아드리겠습니다.</div>
                                <h1 class="display-3 fw-bolder mb-5"><span class="text-gradient d-inline">Let's Find out your Home with me</span></h1>
                            </div>
                        </div>
                        <div class="col-xxl-7">
                            <!-- Header profile picture-->
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div id="map" style="width:600px;height:400px;
                                border-radius: 5px;">
                                  <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="true">
                                    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
                                  </KakaoMap>
                                </div>
                            </div>
                    	</div>
                	</div>
                	<div class="col-md-3 justify-content-start">
                    <div class="badge bg-gradient-primary-to-secondary text-white mb-7 me-2">
                      <div class="text-uppercase">
                        <router-link class="nav-link" id = "apart" :to="{name:'homedeal'}">매물거래가 보러가기</router-link>
                      </div>
                    </div>
                    <div class="badge bg-gradient-primary-to-secondary text-white mb-7">
                      <div class="text-uppercase">
                        <router-link class="nav-link" id = "apart" :to="{name:'board'}">게시판 보러가기</router-link>
                      </div>
                    </div>
                	</div>
                </div>
            </header>
        </main>
    </body>
  </main>
</template>
