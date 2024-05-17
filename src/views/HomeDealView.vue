<script setup>

</script>

<template>
    <header class="py-5">
        <div class="container px-5 pb-5">
            <div class="row gx-5 align-items-center">
                <div class="col-xxl-3">
                    <!-- Header text content-->
                    <div class="text-center text-xxl-start">
                        <div class="badge bg-gradient-primary-to-secondary text-white mb-4"><div class="text-uppercase">매물거래가 </div></div>
                        <div class="fs-3 fw-light text-muted">현재 거래완료 매물</div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="container px-5 pb-5">
        <div class="card mb-4">
            <div class="card-header">
                <i class="fas fa-table me-1"></i>
            </div>
            <div class="card-body">
                <table id="datatablesSimple">
                    <thead>
                        <tr>
                            <th id="headname" >건물명</th>
                            <th id="headprice">매매가</th>
                            <th id="headlocation">건물 위치</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>